import { useParams } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();

  return (
    <section className="page">
      <h1>Item Detail</h1>
      <p>Item ID: {id}</p>
      <p>Detail view coming next.</p>
    </section>
  );
}

export default ItemDetail;
