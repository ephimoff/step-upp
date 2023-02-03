# TODO

## Features

- [x] Add validation to the fields on the `/profile` screen
- [x] Rewrite the logic of the `/profile` using either SWR or useForm or Formik
- [x] Set up some styles for buttons so they are consistent
- [x] Generate slug automatically
- [x] Check it ^^^ for uniqueness
- [x] Add a picture from the SSO service
- [ ] Allow to change the picture
- [x] Add email login
- [ ] Replace `myprofile` with `newUser` endpoint from next-auth
- [x] Refresh instantly the view of competencies right adding a new competency
- [x] Refresh `myprofile` after profile is created
- [ ] Don't allow the same user add 360 to an existing one. Instead rewrite the score
- [ ] Rename 360 to Feedback Score or the likes

## Bugs

- [ ] Check input labels in different resolutions. They hide behind the field and doesn't wrap
- [x] Fix sidebar. It opens up again when clicks on a link. Maybe I need to use React Context to preserve the state of the sidebar across the pages
- [ ] Store the state of the sidebar locally so it preserves after the refresh
- [ ] Fix the sidebar for small height screens. it hides the menu on the top. Maybe need to add `overflow:hidden`
- [ ] Fix an issue with the progress bar when adding a new competency. Somehow it appears cyan

## Notes
