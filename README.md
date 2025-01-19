# Project Details

This project was built as part of assignment
It is basically can be used to visualize all customer transistions and their rewards they got in their transactions
It contains three tabs which show transactions, Monthly Rewards and Total Rewards of Customer 
Used only 1 api call to fetch the details and did the monthly and total reward calucalation in Front-end only

Not used any libraries for UI

# Reward Logic
Cutomer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction
e.g $120 purchase =  2*20 + 1*50 = 90 points

## Project Structure
- /public contains the dummy data
- /src/common contains components which can used all over the application
- /src/components contains main components of the application
- /src/services  includes api calls
- /src/utilites includes functions which were used reward and sum calculations


## Installation and run project locally 
1. Clone the repository
2. Install dependencies by using
     npm install
3. Run the project by using
    npm start

