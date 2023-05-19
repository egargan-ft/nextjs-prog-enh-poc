import { V2_MetaFunction, json } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useActionData } from "@remix-run/react";

// Note the "action" export name, this will handle our form POST
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  debugger;

  return json({ foo: 2 });
};

export default function Index() {

  const data = useActionData<typeof action>();

  console.log(data);

  return (
    <Form method="post">
      <p>
        <label>
          Name: <input name="name" type="text" />
        </label>
      </p>
      <p>
        <label>
          Description:
          <br />
          <textarea name="description" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </Form>
  );
}
