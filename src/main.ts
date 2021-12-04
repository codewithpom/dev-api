import axios from "axios";
import * as core from '@actions/core'



async function create_post(article_title: string, article_tags: Array<string> | undefined, markdown_body: string, published: boolean | undefined, api_key: string) {

    const data = {
        article: {
            title: article_title,
            body_markdown: markdown_body,
            published: published,
            tags: article_tags
        }
    }

    const headers = {
        "api-key": api_key
    }

    await axios.post("https://dev.to/api/articles", data, {headers: headers})

    return "Done"

}

async function run(): Promise<void>{
    try {
        const title = core.getInput("title")

        let tags;
        try {
            tags = (JSON.parse(core.getInput("tags")) as Array<string>)

            if (tags.length > 4) core.setFailed("Cannot add more than 4 tags")

        } catch (e){
            core.setFailed("JSON could not be parsed check it again")
        }
        
        const body = core.getInput("body")
        let publish_string = core.getInput("publish")
        let publish_boolean;
        if (publish_string === "true") {
            publish_boolean = true
        } else if (publish_string === "false") {
            publish_boolean = false
        } else {
            core.setFailed("Parse error in published field check the field again")
        }

        const api_key = core.getInput("api_key")
        try {
            await create_post(title, tags, body, publish_boolean, api_key)
        } catch (e){
            core.setFailed("Wrong API key was provided please check the key again")
        }
    } catch (e){
        core.setFailed("Total Information not provided or an unknown error")
    }
} 

run()

