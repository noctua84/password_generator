# Password Generator  
A NodeJS-API to generate passwords based on user input.

---
### General description and some thoughts on the process:  
The challenge was to create an api that receives user input 
(min length, number of special chars, number of numbers and number of passwords to generate).
Based on the fact, that user data is submitted, the endpoint is designed as post request as 
would be anticipated while processing form data (user input). It could have been realized as a 
plain get-Request with either parameterized url:  
Schema: ``` /password/v1/generate/:min/:specialChars/:numbers/:passwords```  
Call: ``` /password/v1/generate/10/3/3/10```  
or with an url followed by a query string:  
Schema: ``` /password/v1/generate```  
Call: ``` /password/v1/generate?min=10&specialChars=3&numbers=3&passwords=10```  
Security concerns are for all three approaches the same if not been used via https, therefore
no method has a real advantage over the other. The one thing that made the decision point towards 
using post was that post has the least side effects while dealing with form data.

Above that the API has literally two endpoints supplying the same results but with different 
approaches behind the scenes: the v1-Route utilises a functional approach on the controller side, 
whereas the v2-Route utilises a class-based approach.  
At this point no further decision was made just because to walk through the process of implementing both ways.  

After implementing both ways, the functional approach has one advantage over the other: no this-problem 
This leaves aside the somehow wired implementation of this in JavaScript/TypeScript one has to 
deal with while using classes. Apart from the this-problem, it is a mere decision of style and preference.

Another difference between class and functional approach is the handling of potential errors
with the submitted data. Using typed params does not fully guarantee that there will be no errors. 
However the functional approach checks for NaN after trying to parse the submitted data to numbers,
whereas the class-based approach checks for valid typing at usage during the actual generation loop. 
A submitted nonnumerical string is stored in a variable of type number without initial complain. 
That is because types are only checked during compile time and not at run time.

---
## Documentation:
### Libraries used:
**Production**  

| Package Name | Use case                             |
|--------------|--------------------------------------|
| express      | server framework                     |
| helmet       | security middleware collection       |
| cors         | enable cross-origin resource sharing |
| morgan       | route logging middleware             |


**Development**  

| Package name | Use case                                                                   |
|--------------|----------------------------------------------------------------------------|
| jest         | test framework                                                             |
| ts-jest      | tool to enable testing typescript                                          |
| nodemon      | tool to rerun the dev server during development to map changes in the code |
| ts-node      | enable nodemon to run typescript files                                     |

Beside of the listed external dependencies, the node crypto library was used to generate random numbers.

### Server:
The server listens to port 8000 per default but the port can be changed via environment variable

---
### Commands:
* ```npm test``` runs the test suites
* ```npm run start:dev``` spawns a nodemon process to run the dev server
* ```npm run start:debug``` spawns a nodemon process with debug settings
* ```npm run start:build``` compiles the app and run the compiled script.

---
### Endpoints:
* ```password/v1/generate```
* ```password/v2/generate```