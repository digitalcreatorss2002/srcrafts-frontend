async function getData() {
    const URI = process.env.NEXT_PUBLIC_API_URI
    const res = await fetch(`${URI}/api/orders/`, {
      cache: "no-store", // always fresh data
    });
  
    if (!res.ok) {
        return null;
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  
  export default async function ApiResults() {
    const data = await getData();
    
    if (data == null)
    return<>
    <h1>No Data Found !</h1>
    </>
    return (
      <ul className="space-y-3">
        {data.slice(0, 5).map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <h2 className="font-medium">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.body}</p>
          </li>
        ))}
      </ul>
    );
  }
  