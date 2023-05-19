import Form from "@/EnhancedForm";
import styles from "@/styles/Home.module.css";
import useEnhancedForm from "@/useEnhancedForm";
import { GetServerSidePropsContext } from "next";
import handler from "./api/profile";

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

export default function Home() {
  // TODO: pick my 'data' type from the handler
  const foo = useEnhancedForm<ReturnType<typeof handler>>();

  return (
    <>
      <main className={styles.main}>
        <Form action="/api/profile" method="post" className={styles.form}>
          <div>
            <label htmlFor="location">Where do you live?</label>
            <input type="text" id="location" name="location" />
          </div>

          <div>
            <label htmlFor="job">
              Which best describes your job responsibility?
            </label>

            <select name="job" id="job">
              <option value="coding">Coding</option>
              <option value="managing">Managing</option>
              <option value="directing">Directing</option>
            </select>
          </div>

          <div>
            <label htmlFor="position">What&apos;s your job position?</label>
            <input type="text" id="position" name="position" />
          </div>

          <div>
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" name="phone" />
          </div>

          <button type="submit">Submit</button>

          {data.pos && <div>Welcome, {data.pos}!</div>}
        </Form>
      </main>
    </>
  );
}
