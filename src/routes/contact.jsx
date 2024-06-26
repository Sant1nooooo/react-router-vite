import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contact";


export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({params})
{
  const contact = await getContact(params.contactId);
  if (!contact) 
  {
    throw new Response("", { status: 404, statusText: "Not Found",});
  }
  return { contact };
}
export default function Contact() {
  const { contact } = useLoaderData(); //currentContact
  /*
    After the action redirects, React Router calls all of the loaders for the data on the page to get the latest values (this is "revalidation"). 
    "useLoaderData" returns new values and causes the components to update!
  */

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={ contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200` } />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? ( <> {contact.first} {contact.last} </> ) : ( <i>No Name</i> )} {" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && ( <p> <a target="_blank" href={`https://twitter.com/${contact.twitter}`}> {contact.twitter}</a></p> )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            {/*
              The purpose of the `action="edit"` this is where the Form will submit the request, and base on the
              correspoding route in the 'createBrowserRouter' ( "/contacts/:contactId/edit" ) defined in the main.jsx. And this will trigger the 
              function in the 'action' attribute associated with the route "/contacts/:contactId/edit" that will handle or process
              the request.

              If the associated route has 'element' property, then the user will be navigated to the route also.
            */}
            <button type="submit">Edit</button>
            </Form>
          <Form method="post" action="destroy"
            onSubmit={(event) => {
              if (!confirm( "Please confirm you want to delete this record."))
              {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const favorite = contact.favorite;
  // console.log(contact);
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"} aria-label={ favorite ? "Remove from favorites" : "Add to favorites" }>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}