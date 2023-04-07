import { createContext, useContext, useReducer } from 'react';
import { TeamMember, Sin } from '@/types/data';

type TeamEditAction =
  | {type: "add", member: TeamMember, sinner: number}
  | {type: "update", member: TeamMember, sinner: number}
  | {type: "remove", sinner: number}

type TeamDispatcher = (member: TeamMember) => void;


export const TeamContext = createContext<TeamMember[]>([]);
export const TeamResourcesContext = createContext<Map<Sin, number>>(new Map());
export const TeamDispatchContext = createContext<React.Dispatch<TeamEditAction> | null>(null);

export function TeamProvider({
  children,
  initialState
} : {
  children: React.ReactNode;
  initialState: TeamMember[];
}) {

  const [team, dispatchTeam] = useReducer(teamReducer, initialState);

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

export function TeamDispatchFunctions(dispatchTeam : React.Dispatch<TeamEditAction> | null) : TeamDispatcher[] {
  if (dispatchTeam === null) {
    console.error("Tried to get team dispatch functions without dispatch context!");
    return [];
  }

  const addMember = (member: TeamMember) => {
    dispatchTeam({
      type: "add",
      member: member,
      sinner: member.id.sinner
    });
  }

  const removeMember = (member: TeamMember) => {
    dispatchTeam({
      type: "remove",
      sinner: member.id.sinner,
    });
  }

  const updateMember = (member: TeamMember) => {
    dispatchTeam({
      type: "update",
      member: member,
      sinner: member.id.sinner,
    });
  }

  return [addMember, updateMember, removeMember];
}

function teamReducer(team: TeamMember[], action: TeamEditAction) {
  switch(action.type) {
    case "add": {
      return [...team, action.member];
    }
    case "update": {
      const newTeam = team.filter((member) => member.id.sinner !== action.sinner)
      newTeam.push(action.member);
      return newTeam;
    }
    case "remove": {
      return team.filter((member) => member.id.sinner !== action.sinner)
    }
  }
}