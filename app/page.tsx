import { testing_api } from "@/actions/basic-data-grab";
import { BasicLineChart } from "@/components/ui/basic-line-chart";
import { NextPage } from "next";
import Image from "next/image";

const Home:React.FC = async () => {

  let value = await testing_api()


  return (
      <main className="flex grow">
        <div className="flex flex-col grow pt-8 pr-8 min-w-full ">
          <BasicLineChart chartData={value}/>
        </div>
      </main>
  );
}

export default Home