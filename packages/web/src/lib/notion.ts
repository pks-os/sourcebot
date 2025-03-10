import 'server-only';

import { Client } from '@notionhq/client';
import { NOTION_FEEDBACK_INTEGRATION_ID, NOTION_FEEDBACK_INTEGRATION_TOKEN, SOURCEBOT_ROOT_DOMAIN } from './environment';

const notion = new Client({
    auth: NOTION_FEEDBACK_INTEGRATION_TOKEN,
});

export const submitFeedbackToNotion = async (feedback: string) => {
    if (!NOTION_FEEDBACK_INTEGRATION_ID) {
        console.error("NOTION_FEEDBACK_INTEGRATION_ID is not set");
        return;
    }

    const response = await notion.pages.create({
        parent: {
            database_id: NOTION_FEEDBACK_INTEGRATION_ID,
        },
        properties: {
            Name: {
                title: [{ text: { content: "Feedback" } }],
            },
            Created: {
                date: { start: new Date().toISOString() }
            },
            Domain: {
                rich_text: [{ text: { content: SOURCEBOT_ROOT_DOMAIN } }]
            },
            Feedback: {
                rich_text: [{ text: { content: feedback } }]
            }
        },
    });
}