import { Bottomexist } from "../PageComponents/Bottomexist";
import { Button } from "../PageComponents/Button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navi = useNavigate();

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[95vh]">
        <div className="flex flex-col justify-center items-center max-h-screen bg-slate-320">
          <div className="max-w-md w-full p-4 lg:max-w-lg">
            <div className="rounded-lg bg-white text-center p-4 border-8 border-indigo-600">
              <div className="font-bold text-5xl text-indigo-600 mb-2">
                Welcome to
              </div>
              <div className="font-bold text-5xl text-indigo-600 mb-6">
                Payment's App
              </div>
              {/* Additional information about the Payments App */}
              <div className=" pt-3 text-left text-gray-700">
                <p className="text-lg font-semibold mb-3">
                  Payments App is a financial application where users are
                  rewarded upon registration with amounts ranging from 1 to
                  10,000. You can seamlessly transfer money to your friends or
                  family members and receive payments in return if they send.
                </p>
                <p className="text-lg">
                  To learn more about our app, register now and click on your
                  profile to explore additional features and information. Don't
                  miss out on the opportunity to register and start earning!
                </p>
              </div>

              <div
                onClick={() => {
                  navi("/SignUp");
                }}
                className="pt-6"
              >
                <Button
                  label={"Register"}
                  onPress={() => {}}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-full"
                />
              </div>
              <Bottomexist
                label={"Already Registered?"}
                to={"/Signup"}
                text={"Sign in"}
              />
            </div>
          </div>
        </div>
        <div className=" text-gray-600 font-semibold w-full text-center">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by Burada Dhanunjay
        </div>
      </div>
    </>
  );
};
