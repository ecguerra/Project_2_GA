### Models
- User
- Clothing
- Shelter
- UserShelter
- Category

### From Project Proposal
The basic idea of this app is to help people cut down on clothing clutter and to provide them with information about local homeless shelters (and/or charities) where they can donate unwanted items instead of just throwing them away.

- Sign up/Log in: Users create their virtual closets and can save favorite shelters from search results
- Models: Users, Clothing, Shelters
- Third-party API: So far I haven't found a homeless shelter API, but I found a few websites that I think I can data scrape. I also found a recycling API that I might be able to use if those sites don't work for me.
- GET: Users can see their "closet," clothing detail, shelter search results, and saved shelters
- POST: Users can add pieces of clothing to their closets & shelter search results to their saved list. Shelter details also POST information for additional data scraping
- PUT: Users can edit clothing details or tag clothing for donations
- DELETE: Users can "Trash" clothing to delete it or remove shelters from their favorites list

## To-Do
[x] build clothing/shelters functionality
    [x] Donate Clothing option/route
    [x] filter clothing results to DONATE
    [x] connect clothing and shelter
    [x] display clothing and shelter on respective pages
[] add category filter - STRETCH
[x] add KEEP, DONATE, TRASH filter
[x] add isLoggedIn conditionals
[] add donation conditionals (static js) - STRETCH
[x] style
    [x] modify layouts
    [x] CSS
        [x] layout
        [x] alerts
        [x] navbar
        [x] home
        [x] auth/signup
        [x] auth/login
        [x] profile
        [x] clothing/index
        [x] clothing/new
        [x] clothing/show
        [x] clothing/edit
        [x] shelters/search
        [x] shelters/results
        [x] shelters/show
        [x] shelters/saved
        [x] shelters/detail

[] write readme
    [x] update ERD
    [] update wireframes

[] deploy
