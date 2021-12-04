# dev-api

you can use it as a workflow
```yml
name: Create post
on: push
jobs:
  create_post:
    runs-on: ubuntu-latest
    
    steps: 
      - uses: codewithpom/dev-api@v1.5
        with:
          title: Test post by GitHub Actions
          tags: '["testing"]'
          body: '# Testing with GitHub actions'
          publish: "false"
          api_key: "xzVKxtUP63ouYhJTP49F4Liv"
```
open an issue if you have any doubt


