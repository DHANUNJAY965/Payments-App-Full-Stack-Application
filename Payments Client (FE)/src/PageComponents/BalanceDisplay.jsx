
export default function BalanceDisplay({balance}) {
  return (
    <div className="flex  mt-6"> 
        <div className="font-bold text-lg ml-4">
            Your balance is :
        </div>
        <div className="font-semibold ml-4 text-lg">
        ₹ {balance}
        </div>
    </div>
  )
}
   
{/* <div className="flex fixed mt-6">  */}
