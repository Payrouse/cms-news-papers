import { useSelector } from 'react-redux';
import { StoreType } from '../../../../redux/types';
import { OnlyAdmin } from '../../../../utils/Roles';
import IconPath from '../../../../utils/svg/IconPath';

const HeaderStats = () => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  return (
    <>
      {/* Header */}
      <div className=" md:pt-16 pb-12 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                {OnlyAdmin(user && user.roles) ? (
                  <CardStats
                    statSubtitle="Trafico"
                    statTitle="10,506"
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-green-500"
                    statDescription="Último mes"
                    statIconName={IconPath.trendUp}
                    statIconColor="bg-red-500"
                  />
                ) : (
                  <CardStats
                    statSubtitle="Artículos publicados"
                    statTitle="10"
                    statArrow="up"
                    statPercent=""
                    statPercentColor=""
                    statDescription=""
                    statIconName={IconPath.world}
                    statIconColor="bg-red-500"
                  />
                )}
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                {OnlyAdmin(user && user.roles) ? (
                  <CardStats
                    statSubtitle="Nuevos usuarios"
                    statTitle="31"
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescription="Última semana"
                    statIconName={IconPath.users}
                    statIconColor="bg-yellow-500"
                  />
                ) : (
                  <CardStats
                    statSubtitle="Artículos pendientes"
                    statTitle="1"
                    statArrow="up"
                    statPercent=""
                    statPercentColor="text-red-500"
                    statDescription=""
                    statIconName={IconPath.checkList}
                    statIconColor="bg-yellow-500"
                  />
                )}
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                {OnlyAdmin(user && user.roles) ? (
                  <CardStats
                    statSubtitle="Categorías"
                    statTitle="5"
                    statArrow=""
                    statPercent=""
                    statPercentColor=""
                    statDescription=""
                    statIconName={IconPath.other}
                    statIconColor="bg-pink-500"
                  />
                ) : (
                  <CardStats
                    statSubtitle="Visitas de artículos"
                    statTitle="924"
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-orange-500"
                    statDescription="Desde ayer"
                    statIconName={IconPath.users}
                    statIconColor="bg-pink-500"
                  />
                )}
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                {OnlyAdmin(user && user.roles) ? (
                  <CardStats
                    statSubtitle="Denuncias"
                    statTitle="50"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-green-500"
                    statDescription="Último mes"
                    statIconName={IconPath.complaint}
                    statIconColor="bg-blue-500"
                  />
                ) : (
                  <CardStats
                    statSubtitle="Interacción en comentarios"
                    statTitle="49,65%"
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-green-500"
                    statDescription="Último mes"
                    statIconName={IconPath.other}
                    statIconColor="bg-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardStats = ({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescription,
  statIconName,
  statIconColor,
}: any) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-gray-800">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                {/* <i className={statIconName}></i> */}
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d={statIconName} />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <span className={statPercentColor + ' mr-2'}>
              <i
                className={
                  statArrow === 'up'
                    ? 'fas fa-arrow-up'
                    : statArrow === 'down'
                    ? 'fas fa-arrow-down'
                    : ''
                }
              ></i>{' '}
              {statPercent ? `${statPercent}%` : ''}
            </span>
            <span className="whitespace-no-wrap">{statDescription}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
