import os 
import shutil
labels=os.listdir('../YoloT/labels/train')

for label in labels:
    image_dest_path='../YoloT/images/train2/'+label.split('.txt')[0]+'.png'
    image_source_path='../YoloT/images/train/'+label.split('.txt')[0]+'.png'
    shutil.move(image_source_path, image_dest_path)
      

        
