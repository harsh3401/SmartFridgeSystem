import os 
image_list=os.listdir('Training_images')
folders=['Harsh','Naman','Samved','Ishaan']
print(len(image_list))

for j in range(0,len(folders)):
    path='Training_images/'+folders[j]
    os.mkdir(path)
    for i in range(len(image_list)/4*j,len(image_list)/4*(j+1)):
        og_path='Training_images/'+image_list[i]
        new_path='Training_images/'+folders[j]+"/"+image_list[i]
        os.rename(og_path,new_path)
      

        
