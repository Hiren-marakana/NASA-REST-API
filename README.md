# API Gateway + Lambda
Create a Lambda function <b>earthobjects</b> using AWS console, exposed via an NASA-API Gateway which retrieves a list of “Near Earth Objects”.

<b>Step 1.</b> Using the NASA API (https://api.nasa.gov/) simply generated my API key which is <b>LXpfjasGceq2bgXEQoLqMFkFSRUacypikNduOmfA</b>

<b>Step 2.</b> How to create lambda function and API using AWS console:

               * Create new lambda function.
               * Filed out the basic information required which includes function name, chosen language(node.js) and architecture. 
               * Go to search bar and search for API Gateway.
               * Choose API type as HTTP API and cliked on Build.
               * Click on add intergations and select lambda from drop down box.
               * Select AWS region and selected previously created lambda function from drop down box.
               * Give name to the API.
               
<b>Step 3.</b> After calling the API.

               * Call the NASA-API in Lambda function.
               * After receiveing the API response we get:
               
                     i.      The ID
                     ii.     The name of the Object
                     iii.    The diameter of the Object, in metres
                     iv.     Whether or not the Object is hazardous
                     v.      The velocity of the object in Kilometres per hour
              
            
