import { useReducer } from 'react';
import { TeamMember } from '@/types/data';

type TeamEditAction =
  | {type: "add", member: TeamMember, sinner: number}
  | {type: "update", member: TeamMember, sinner: number}
  | {type: "remove", sinner: number}

type TeamDispatcher = (member: TeamMember) => void

export function TeamReducer(initialState : TeamMember[]) : [TeamMember[], TeamDispatcher, TeamDispatcher, TeamDispatcher] {
  const [team, dispatchTeam] = useReducer(teamReducer, initialState);

  function addMember(member: TeamMember) {
    dispatchTeam({
      type: "add",
      member: member,
      sinner: member.id.sinner
    });
  }

  function removeMember(member: TeamMember) {
    dispatchTeam({
      type: "remove",
      sinner: member.id.sinner,
    });
  }

  function updateMember(member: TeamMember) {
    dispatchTeam({
      type: "update",
      member: member,
      sinner: member.id.sinner,
    });
  }

  return [team, addMember, updateMember, removeMember];
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