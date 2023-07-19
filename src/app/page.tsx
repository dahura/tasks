import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl"> CRUD Rest API</h1>
      <div className="flex flex-col space-y-2 mt-4 text-amber-900">
        <div className="">
          POST: /api/users
          <span className="ml-4">
            body :{" "}
            {`{id:Int,
  email String,
  name  String,
  age   String,
  city  String}
}`}
          </span>
        </div>
        <div>
          GET: /api/users <span>return CSV file</span>
        </div>
        <div>GET: /api/users/[id]</div>
        <div>DELETE: /api/users/[id]</div>
        <div>PATCH: /api/users/[id]</div>
      </div>
    </main>
  );
}
