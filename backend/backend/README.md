- frontend api calls --> backend server --> database
- DL server --> backend server (for current classification and in order to find differences)
- backend server --> hardware server --> DL server


TODO:
 Backend Server
 - <s>Keep track of user food items</s>
 - Get / update the status of user's notifications
 - Get current state of fridge items    
 - <s>user profile api's</s>
 - periodically call getImage in hardware (django_crontab)
 - <s>firebase integration for cloud messaging </s> 
 -  S3 integration for image storage
 - store food items shelf lifetimes and alert of expiration?

 DL server
 - fix image skewness (image preprocessing)
 - recipe recommendation model
 - object detection and classification model
 - send classification results to backend server
 - object stale vs fresh detection?? 
 
 Hardware Server
 - get image from camera
 - send image to DL server
 - add listener for backend server 

 Frontend
 - <s> authenticated routes
 - persist token 
 - logout when 401 request
 - autocomplete when manually adding food items </s>



<!-- TODO: assign every arduino module a unique identifier associated with user (MAC Address??) -->
<!-- currently: one arduino module -->