import Toolbar from '../../../toolbar/AdminToolbar';
import CardPageVisits from './CardPageVisits';
import CardSocialTraffic from './CardSocialTraffic';
import HeaderStats from './HeaderStats';

const Dashboard = (props: any) => {
  return (
    <>
      <Toolbar title={props.titleToolbar} />
      <div className="custom-scroll">
        <div className="mt-2">
          <HeaderStats />
        </div>
        <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
               <CardPageVisits />
            </div>
            <div className="w-full xl:w-4/12 px-4">
               <CardSocialTraffic />
            </div>
         </div>
      </div>
    </>
  );
};

export default Dashboard;
