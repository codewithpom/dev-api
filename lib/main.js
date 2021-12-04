"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
(0, child_process_1.execSync)("npm i axios @actions/core");
const axios_1 = __importDefault(require("axios"));
const core = __importStar(require("@actions/core"));
function create_post(article_title, article_tags, markdown_body, published, api_key) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            article: {
                title: article_title,
                body_markdown: markdown_body,
                published: published,
                tags: article_tags
            }
        };
        const headers = {
            "api-key": api_key
        };
        yield axios_1.default.post("https://dev.to/api/articles", data, { headers: headers });
        return "Done";
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const title = core.getInput("title");
            let tags;
            try {
                tags = JSON.parse(core.getInput("tags"));
                if (tags.length > 4)
                    core.setFailed("Cannot add more than 4 tags");
            }
            catch (e) {
                core.setFailed("JSON could not be parsed check it again");
            }
            const body = core.getInput("body");
            let publish_string = core.getInput("publish");
            let publish_boolean;
            if (publish_string === "true") {
                publish_boolean = true;
            }
            else if (publish_string === "false") {
                publish_boolean = false;
            }
            else {
                core.setFailed("Parse error in published field check the field again");
            }
            const api_key = core.getInput("api_key");
            try {
                yield create_post(title, tags, body, publish_boolean, api_key);
            }
            catch (e) {
                core.setFailed("Wrong API key was provided please check the key again");
            }
        }
        catch (e) {
            core.setFailed("Total Information not provided or an unknown error");
        }
    });
}
run();
