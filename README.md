# Password Generator  
A NodeJS-API to generate passwords based on user input.

### General description and some thoughts on the process:  
The challenge was to create an api that receives user input 
(min length, number of special chars, number of numbers and number of passwords to generate).
Based on the fact, that user data is submitted, the endpoint is designed as post request as 
would be anticipated while processing form data (user input). It could have been realized as a 
plain get-Request with either parameterized url:  
``` /password/v1/generate/:min/:specialChars/:numbers/:passwords```  
or with an url followed by a query string:  
``` /password/v1/generate?min=10&specialChars=3&numbers=3&passwords=10```  
Security concerns are for all three approaches the same if not been used via https, therefore
no method has a real advantage over the other. The one thing that made the decision point towards 
using post was that post has the least side effects while dealing with form data.

Above that the API has literally two endpoints supplying the same results but with different 
approaches behind the scenes: the v1-Route utilises a functional approach on the controller side, 
whereas the v2-Route utilises a class-based approach.  
At this point no further decision was made due to walk to the process of creating both ways.  

After implementing both ways, the functional approach has one advantage over the other: no this-problem 
This leaves aside the somehow wired implementation of this in JavaScript/TypeScript one has to 
deal with while using classes. Apart from the this-problem, it is a mere decision of style and preference.

Another difference between class and functional approach is the handling of potential errors
with the submitted data. Using typed params does not fully guarantee that there will be no errors. 
However the functional approach checks for NaN after trying to parse the submitted data to numbers,
whereas the class-based approach checks for valid typing at usage during the actual generation loop. 
A submitted nonnumerical string is stored in a variable of type number without initial complain. 
That is because types are only checked during compile time and not at run time.

## Documentation:
### Libraries used:

### Commands:
* ```npm test```
* ```npm run start:dev```
* ```npm run start:debug```
* ```npm run start:build```

### Endpoints:
* ```localhost:8000/password/v1/generate```
* ```localhost:8000/password/v2/generate```