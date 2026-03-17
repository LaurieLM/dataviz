import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let message = "Unexpected error";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || "Error";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops !</h1>

        <p className="text-gray-700 text-lg">
          Désolé, une erreur inattendue s’est produite.
        </p>

        <p className="mt-4 italic text-gray-500">{message}</p>

        {/* Bottone per tornare alla home */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>

      <p className="mt-6 text-gray-400 text-sm">
        © Cinéma Paris Dataviz ✨
      </p>
    </div>
  );
}

