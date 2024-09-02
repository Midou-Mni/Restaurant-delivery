import { createClient } from "@sanity/client";
import imageBuilder from "@sanity/image-url"

const client = createClient({
    projectId: 'xumhhfpn',
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: true,
});

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client

// sanity cors add http://localhost:3000
// ? Sanity Studio: npx @sanity/cli cors add http://localhost:3000