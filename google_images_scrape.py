import selenium
from selenium import webdriver
import requests
import os
import hashlib
from PIL import Image
import time
import io
import base64

def get_image_urls(wd:webdriver, max_links, query):
    def scroll_to_end(wd):
        wd.execute_script("window.scrollTo(0, document.body.scrollHeight);")


    search_url = f"https://www.google.com/search?q={query}&tbm=isch&hl=en-US&tbs=isz:l&sa=X&ved=0CAIQpwVqFwoTCOj28bSM1vECFQAAAAAdAAAAABAC&biw=1908&bih=957"

    wd.get(search_url)
    image_urls = []
    count = 0
    while count < max_links:
        scroll_to_end(wd)
        thumbnail_results = wd.find_elements("css selector","img.Q4LuWd")
        num_results = len(thumbnail_results)
        print(f"Found {num_results} search result. Getting source of {num_results}:..{max_links}")
        time.sleep(2)

        print(len(thumbnail_results))
        for img in thumbnail_results:
            try:
                encoded = img.get_attribute('src').split('base64,')
                encoded[1] = encoded[1].encode('utf-8')
                image_urls.append(encoded[1])
                count = len(image_urls)
                print(f"count: {count}")
                
                if count >= max_links:
                    print(f"Fetched {count} urls...Downloading!")
                    return image_urls
            except Exception as e:
                pass
        else:
            print("Found:", len(image_urls), "image links, looking for more ...")
            # time.sleep(10)
            load_more_button = wd.find_element("css selector", ".mye4qd")
            if load_more_button:
                wd.execute_script("document.querySelector('.mye4qd').click();")

    return image_urls


def persist_image(folder_path,query, url, count):
    # try:
    #     image_content = requests.get(url).content

    # except Exception as e:
    #     print(f"ERROR - Could not download {url} - {e}")

    # try:
    #     image_file = io.BytesIO(image_content)
    #     image = Image.open(image_file).convert('RGB')
    #     folder_path = os.path.join(folder_path, query)
        # if os.path.exists(folder_path):
        #     file_path = os.path.join(folder_path,hashlib.sha1(image_content).hexdigest()[:10] + '.jpg')
        # else:
        #     os.mkdir(folder_path)
        #     file_path = os.path.join(folder_path,hashlib.sha1(image_content).hexdigest()[:10] + '.jpg')
    #     with open(file_path, 'wb') as f:
    #         image.save(f, "JPEG", quality=85)
    #     print(f"{count} :: SUCCESS - saved {url} - as {file_path}")
    # except Exception as e:
    #     print(f"ERROR - Could not save {url} - {e}")
    
    if not os.path.exists(folder_path + query):
        os.makedirs(folder_path+query)

    file_path = f"{folder_path}{query}/{count}.jpg"
    with open(file_path, 'wb') as f:
        f.write(base64.decodebytes(url))

if __name__ == '__main__':
    # wd = webdriver.Chrome(executable_path='/chromedriver')
    query = input("Enter query to download...")
    max_links = int(input("Enter number of images to download..."))
    wd = webdriver.Chrome(executable_path="/usr/lib/chromium-browser/chromedriver")
    links = get_image_urls(wd, max_links, query)
    wd.quit()
    if not os.path.exists('pics/'):
        os.makedirs("pics")
    count = 0
    for img in links:
        count += 1
        persist_image("pics/", query, img, count)    
    print(f"Downloaded {len(os.listdir('pics/' + str(query)))} images")
    wd.quit()
