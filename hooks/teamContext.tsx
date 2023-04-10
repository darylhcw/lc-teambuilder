import { createContext, useReducer } from 'react';
import initialIdData from './initialTeam.json';
import { TeamMember, IdentityData, EgoData, Sin, SINNER_NUMBERS, SinnerNumber } from '@/types/data';

type TeamEditAction =
  | {type: "set-active", sinner: SinnerNumber, active: boolean}
  | {type: "update-id", identity: IdentityData}
  | {type: "update-ego", ego: EgoData}

const TeamContext = createContext<TeamMember[]>([]);
const TeamResourcesContext = createContext<Map<Sin, number>>(new Map());
const TeamDispatchContext = createContext<React.Dispatch<TeamEditAction>>(initialDispatch);

function TeamProvider({
  children,
  initialState
} : {
  children: React.ReactNode;
  initialState: TeamMember[];
}) {
  const [team, dispatchTeam] = useReducer(teamReducer, initialTeamMembers());

  const teamResources = new Map<Sin, number>();
  for (const member of team) {
    member.id.skills.forEach((skill, index) => {
      const sin = skill.affinity;
      const resources = 3 - index;
      if (teamResources.has(sin)) {
        teamResources.set(sin, teamResources.get(sin)! + resources);
      } else {
        teamResources.set(sin, resources)
      }
    })
  }

  return (
    <TeamContext.Provider value={team}>
      <TeamDispatchContext.Provider value={dispatchTeam}>
        <TeamResourcesContext.Provider value={teamResources}>
          {children}
        </TeamResourcesContext.Provider>
      </TeamDispatchContext.Provider>
    </TeamContext.Provider>
  );
}


function TeamDispatchFunctions(dispatchTeam : React.Dispatch<TeamEditAction>)
 : [
    (sinner: SinnerNumber, active: boolean) => void,
    (identity: IdentityData) => void
   ]
{
  const setActive = (sinner: SinnerNumber, active: boolean) => {
    dispatchTeam({
      type: "set-active",
      sinner: sinner,
      active: active,
    });
  }
  const updateId = (identity: IdentityData) => {
    dispatchTeam({
      type: "update-id",
      identity: identity,
    });
  }
  return [setActive, updateId];
}

function EgoDispatchFunctions(dispatchTeam: React.Dispatch<TeamEditAction>) {
  const egoSelected = (ego: EgoData) => {
    dispatchTeam({
      type: 'update-ego',
      ego: ego,
    });
  }

  return [egoSelected]
}

function teamReducer(team: TeamMember[], action: TeamEditAction) {
  switch(action.type) {
    case "set-active": {
      return team.map((member) => {
        return member.sinner === action.sinner ? {...member, active:action.active }: member;
      })
    }
    case "update-id": {
      return team.map((member) => {
        return member.sinner === action.identity.sinner ? {...member, id: action.identity }: member;
      })
    }
    case "update-ego": {
      const sinner = action.ego.sinner;
      const updatedMember = team.find((member) => member.sinner === sinner);
      if (!updatedMember) {
        console.error("Missing member for ego update!", sinner);
        return team;
      }

      const justRemove = updatedMember.egos.find((ego) => ego.name === action.ego.name) !== undefined;
      const newEgos = updatedMember.egos.filter((ego) => ego.rarity !== action.ego.rarity);
      if (!justRemove) {
        newEgos.push(action.ego);
      }

      return team.map((member) => {
        return member.sinner === action.ego.sinner ? {...member, egos:newEgos }: member;
      })
    }
  }
}


function initialTeamMembers() : TeamMember[] {
  const members = [];

  let index = 0;
  for (const identity of initialIdData) {
    const member = {
      sinner: SINNER_NUMBERS[index],
      id: identity as IdentityData,
      egos: [],
      active: index === 0,  // Let Yi Sang be active to show how it works.
    }
    members.push(member);
    index++;
  }

  return members;
}

// Put here so ts doesn't complete and we don't have to deal with a null.
function initialDispatch(action: TeamEditAction) {
  console.error(`Tried to call dispatch without TeamReducer setup!! \n
                 Please ensure TeamProvider component is created before creating/doing any dispatch actions!\n
                 Action tried ${action}`);
}


export {
  TeamContext, TeamDispatchContext, TeamResourcesContext,
  TeamProvider,
  TeamDispatchFunctions, EgoDispatchFunctions,
}