import { ClientComponents } from "@/dojo/createClientComponents";
import { useDojo } from "@/hooks/context/DojoContext";
import { currencyFormat } from "@/ui/utils/utils";

export const ArmyViewCard = ({
  army,
  onClick,
  active,
}: {
  army: ClientComponents["Army"]["schema"] & { name: string };
  onClick: (entityId: string) => void;
  active?: boolean;
}) => {
  return (
    <div
      onClick={() => onClick(army.entity_id.toString())}
      className={` p-2 hover:bg-gold hover:text-brown border border-transparent ${
        active ? "bg-gold text-brown animate-pulse" : ""
      }`}
    >
      <h5>{army.name}</h5>
      <hr />
      <div>{army.battle_id ? army.battle_id : "No battle"}</div>

      <div>Battle:{army.battle_side ? army.battle_side : "idle"}</div>
      <div>Crossbowman: {currencyFormat(army.troops.crossbowman_count, 0)}</div>
      <div>Knights: {currencyFormat(army.troops.knight_count, 0)}</div>
      <div>Paladins: {currencyFormat(army.troops.paladin_count, 0)}</div>
    </div>
  );
};