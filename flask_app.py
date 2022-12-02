from flask import Flask, redirect, url_for, request
app = Flask(__name__)

import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from functools import reduce
import pandas as pd
import ast
# Set All Recommendation Model Parameters
N_topics = 50             # Number of Topics to Extract from corpora
N_top_docs = 200          # Number of top documents within each topic to extract keywords
N_top_words = 25          # Number of keywords to extract from each topic
N_docs_categorized = 2000 # Number of top documents within each topic to tag 
N_neighbor_window = 4     # Length of word-radius that defines the neighborhood for
                          # each word in the TextRank adjacency table

# Query Similarity Weights
w_title = 0.2
w_text = 0.3
w_categories = 0.5
w_array = np.array([w_title, w_text, w_categories])

# Recipe Stopwords: for any high volume food recipe terminology that doesn't contribute
# to the searchability of a recipe. This list must be manually created.
recipe_stopwords = ['cup','cups','ingredient','ingredients','teaspoon','teaspoons','tablespoon',
                   'tablespoons','C','F']

# loading the pickle files
with open ('text_tfidf.pkl', 'rb') as f:
    text_tfidf = pickle.load(f)

with open ('recipes.pkl', 'rb') as f:
    recipes = pickle.load(f)

with open ('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

def qweight_array(query_length, qw_array = [1]):
    '''Returns descending weights for ranked query ingredients'''
    if query_length > 1:
        to_split = qw_array.pop()
        split = to_split/2
        qw_array.extend([split, split])
        return qweight_array(query_length - 1, qw_array)
    else:
        return np.array(qw_array)

def ranked_query(query):
    '''Called if query ingredients are ranked in order of importance.
    Weights and adds each ranked query ingredient vector.'''
    query = [[q] for q in query]      # place words in seperate documents
    q_vecs = [vectorizer.transform(q) for q in query] 
    qw_array = qweight_array(len(query),[1])
    q_weighted_vecs = q_vecs * qw_array
    q_final_vector = reduce(np.add,q_weighted_vecs)
    return q_final_vector

def overall_scores(query_vector):
    '''Calculates Query Similarity Scores against recipe title, instructions, and keywords.
    Then returns weighted averages of similarities for each recipe.'''
    final_scores = text_tfidf*query_vector.T*w_text
    return final_scores

def print_recipes(index, query, recipe_range):
    '''Prints recipes according to query similary ranks'''
    print('Search Query: {}\n'.format(query))
    dict = []
    nutrition_labels=["calories (kcal)", "total fat (PDV)", "sugar (PDV)" ," sodium (PDV) "," protein (PDV) ", "saturated fat (PDV) ", "Carbohydrates (PDV)"]

    for i, index in enumerate(index, recipe_range[0]):
       
        print('Recipe Rank: {}\t'.format(i+1),i,'\n')
        print('Ingredients:\n{}\n '.format(recipes.loc[index, 'ingredients']))
        print('Instructions:\n{}\n'.format(recipes.loc[index, 'steps']))
        print('Nutrition:\n{}\n'.format(recipes.loc[index, 'nutrition']))
        nutrition={}
        for loc in range(0,5):
            nutrition_values=ast.literal_eval(recipes.loc[index, 'nutrition'])
            nutrition[nutrition_labels[loc]]=nutrition_values[loc]
        print(nutrition)
        tmp = {
            "recipe_rank": i,     "recipe_name":  recipes.loc[index, 'name'],
            "ingredients": recipes.loc[index, 'ingredients'],
            "steps": recipes.loc[index, 'steps'],
            "nutrition_data":nutrition,
        }
        dict.append(tmp)
    return dict
    
def Search_Recipes(query, query_ranked=False, recipe_range=(0,3)):
    '''Master Recipe Search Function'''
    if query_ranked == True:
        q_vector = ranked_query(query)
    else:
        q_vector = vectorizer.transform([' '.join(query)])
    recipe_scores = overall_scores(q_vector)
    sorted_index = pd.Series(recipe_scores.toarray().T[0]).sort_values(ascending = False)[recipe_range[0]:recipe_range[1]].index
    return print_recipes(sorted_index, query, recipe_range)



@app.route('/api/recommend',methods = ['POST'])
def login():
   if request.method == 'POST':
       
        ingredients = request.json.get('ingredients')
        if(ingredients):
            if len(ingredients) <1:
                return {"error": "Invalid input"},400
            op = Search_Recipes(ingredients, query_ranked=True, recipe_range=(0,10))
            return {"data": op}
        else:   
            return {"error": "Invalid input"},400

    
       

if __name__ == '__main__':
   app.run(debug = True)