interface Props {
  tipsAmount: number;
  total: number;
}

const Tips: React.FC<Props> = ({ tipsAmount, total }) => {
  return (
    <>
      <div className="block">
        <div className="in-line">
          <h3>Propina</h3>
          <p>/ persona</p>
        </div>
        <div className="real">
        <p className="finales">${tipsAmount}</p>
        </div>
        
      </div>


      <div className="block">
        <div className="in-line">
          <h3>Total</h3>
          <p>/ persona</p>
        </div>
        <p className="finales">${total}</p>
      </div>


    </>
  )
}

export default Tips;
