import { useEffect, useState } from "react";
import { OrderIcon } from "../../../../../elements/OrderIcon";
import Button from "../../../../../elements/Button";
import { ResourceIcon } from "../../../../../elements/ResourceIcon";
import { findResourceById } from "../../../../../constants/resources";
import { ReactComponent as RatioIcon } from "../../../../../assets/icons/common/ratio.svg";
import { orderNameDict } from "../../../../../constants/orders";
import * as realmsData from "../../../../../geodata/realms.json";
import { MarketInterface } from "../../../../../hooks/graphql/useGraphQLQueries";
import { useGetRealm } from "../../../../../hooks/helpers/useRealm";
import clsx from "clsx";
import { ResourcesOffer } from "../../../../../types";

type TradeOfferProps = {
  marketOffer: MarketInterface;
  onAccept: () => void;
};

export const MarketOffer = ({ marketOffer, onAccept }: TradeOfferProps) => {
  const { distance, resourcesGet, resourcesGive, canAccept, ratio } = marketOffer;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [marketOffer]);

  let { realm: makerRealm } = useGetRealm(marketOffer.makerId);

  return (
    <div className="flex flex-col p-2 border rounded-md border-gray-gold text-xxs text-gray-gold">
      <div className="flex items-center justify-between">
        {makerRealm && (
          <div className="flex items-center p-1 -mt-2 -ml-2 border border-t-0 border-l-0 rounded-br-md border-gray-gold">
            {/* // order of the order maker */}
            {makerRealm.order && <OrderIcon order={orderNameDict[makerRealm.order]} size="xs" className="mr-1" />}
            {realmsData["features"][makerRealm.realmId - 1].name}
          </div>
        )}
        <div className="-mt-2 text-gold">{`${distance.toFixed(0)} km`}</div>
      </div>
      <div className="flex items-end mt-2">
        <div className="flex items-center justify-around flex-1">
          <div className="flex-1 text-gold flex justify-center items-center flex-wrap">
            {resourcesGive &&
              resourcesGive.map(({ resourceId, amount }) => (
                <div className="flex flex-col items-center mx-2 my-0.5" key={resourceId}>
                  <ResourceIcon resource={findResourceById(resourceId)?.trait as any} size="xs" className="mb-1" />
                  {amount}
                </div>
              ))}
          </div>
          <div className="flex flex-col items-center text-white">
            <RatioIcon className="mb-1 fill-white" />
            {resourcesGive && resourcesGet && ratio.toFixed(2)}
          </div>
          <div className="flex-1 text-gold flex justify-center items-center flex-wrap">
            {resourcesGet &&
              resourcesGet.map(({ resourceId, amount }) => (
                <div className="flex flex-col items-center mx-2 my-0.5" key={resourceId}>
                  <ResourceIcon resource={findResourceById(resourceId)?.trait as any} size="xs" />
                  {amount}
                </div>
              ))}
          </div>
        </div>
        {!isLoading && (
          <div className="flex flex-col justify-center relative">
            <Button
              disabled={!canAccept}
              onClick={() => {
                onAccept();
              }}
              variant={canAccept ? "success" : "danger"}
              className={clsx("ml-auto p-2 !h-4 text-xxs !rounded-md", !canAccept && "mb-4")}
            >{`Accept`}</Button>
            {!canAccept && (
              <div className="text-xxs text-order-giants/70 w-min absolute whitespace-nowrap right-0 bottom-0">
                Insufficient resources
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <Button
            isLoading={true}
            onClick={() => {}}
            variant="danger"
            className="ml-auto p-2 !h-4 text-xxs !rounded-md"
          >
            {}
          </Button>
        )}
      </div>
    </div>
  );
};

export const calculateRatio = (resourcesGive: ResourcesOffer[], resourcesGet: ResourcesOffer[]) => {
  let quantityGive = 0;
  for (let i = 0; i < resourcesGive.length; i++) {
    quantityGive += resourcesGive[i].amount;
  }
  let quantityGet = 0;
  for (let i = 0; i < resourcesGet.length; i++) {
    quantityGet += resourcesGet[i].amount;
  }
  return quantityGet / quantityGive;
};
