# stayInn
This is for the full stack development of a React powered webapp called StayInn

# Branch Format (Changes may be made):
<pre>
Master -> Testing -> Development
                  -> SubDev (Profile/User)        -> Personal branch 
                  -> SubDev (Search/SearchResult) -> Personal branch
                  -> SubDev (Payment/Checkout)    -> Personal branch
</pre>
# Team for Development: 

React UI Devs:
- Gideon
- Lawrence
- Philip

React Function Dev:
- Jun
- Philip
- Patrick

Testers:
- Alan
- Patrick
- Jun

Backend:
- Chad
- Gideon
- Alan

Documenters:
- Chad
- Lawrence

Technical Lead: Richard

Product Owner: Vivian

# How to Start:

1. clone the repository to your local machine with "git clone" command
2. Locate the Sanbox branch with "git checkout (branch_name)" command
3. Create a personal branch from sandbox with "git branch (your_branch_name)" command

# Proposed Structure (Hierarchy of Files):
<pre>
> src
  > app
    > common
      > form
      > util
    > config
      > Firebase.js
    > layout
      > App.jsx
    > reducers
    > store
      > ConfigureStore.js
  > features
    > auth
      > login
      > register
    > home
    > hotel 
      > filterResult
      > searchResult
      > searchResultList
    > modals
    > navbar
    > payment
    > user
