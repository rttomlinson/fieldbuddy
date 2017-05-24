# assignment_djello
Project management with that great wobbly taste.

admin login:
username - admin@admin.com
password - admin

Database - Postgresql


Database Model:

User
    can have multiple boards
    can have multiple cards

Board
    can have multiple lists
    belong to multiple users

List
    can have multiple cards
    belong to a single board

Cards
    can have multiple activities
    can have multiple (users)members
    belongs to a list

Activity
    belong to a single card
    belongs to a user
    
    
User flow -->

auth/login

api/


If a user is not logged in,
redirect to login page

Users require authentication to get information from the backend,
will be handled with an auth token that will be sent with requests

Auth token get stored in the state -- (Should move to localStorage or sessionStorage)

How to handle auth?
Use passport without sessions, in callback send a response of json with signature of { token: <token> }

On subsequent requests to the backend ==> pull the token off the state and send the request
i.e. dispatch request with state.authToken, handled with thunk


State=======================
Boards
Users
Lists
Cards
Activities
isAuth: false
otherwise - { token: kjlajdfkajf }












