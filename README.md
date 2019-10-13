## Tong-tong
For most people, especially students, splitting bills is an everyday task. Unfortunately, it's not a fun one! So we said: let's make it easy!

Tong-tong, derived from a Malaysian slang to mean "to share (expenses)", is a mobile app that lets you Snap & Split your bill.

## Snap & Split: How It Works
Tong-tong breaks down the bill-splitting process into two steps:  
1) Snap a photo of your receipt/bill  
2) Split your expenses among friends    

In other words, you no longer have to manually add your expenses (re: Splitwise) - it does it for you! All that's left for you to do is identify who-paid-what.

## The Tech Behind Tong-tong
The process of making the app can be split into 3 parts:  
**1. The front end (Mirza)**     
The app was built using React Native to access the device's camera to snap the photo of the receipt, and also device's photo gallery to access previously stored photo of the receipt. The front end also handles the parsed itemized bills from the OCR to show the summary and final calculation of the total expenditure. 
    
**2. The image processing (Khairina)**   
Tong-tong is a use case of Optical Character Recognition (OCR). The app uses the Tesseract OCR to identify text from images. Put into context, image processing and text recognition is done on snapshots of receipts/bills to extract information about item description and price.
    
**3. The back end (Mujahid)**   
For the back end, it was a REST API built using Flask. The API has one endpoint that takes in a photo object, which is used as endpoint to upload the image taken from the mobile app to the server. Then, the Flask server passes down the image to the image processor that lives in the server to run Tesseract's image-to-text processing. 
 
## Limitations
Initially, we deployed the server to Heroku, but because the Tessaract OCR library is fairly huge, we couldn't get it to work because we exceeded the memory for Heroku's free tier plan. Therefore, because of that, everything is locally hosted as of now.

## Future plans
One important feature that we did not implement is handwriting recognition. We realized that handwriting recognition is difficult to achieve in comparison to typed documents. So, a future plan would be to use Tensor Flow to build a machine learning model that could allow the app to recognize handwritten texts on the receipts. We want to also deploy the app live so that people can actually download it.
  
**This project is a submission for MHacks 2019. Teammates are [Mirza Nor Azman](https://github.com/mirzanorazman), [Khairina Ibrahim](https://github.com/bintiibrahim), and [Mujahid Anuar](https://github.com/mujahidfa). All are/were students from University of Wisconsin-Madison.**

Link to [Devpost](https://devpost.com/software/tong-tong).
