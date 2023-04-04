import { useReducer } from 'react';
import { TeamMember } from '@/types/data';

type TeamEditAction =
  | {type: "add"; payload: TeamMember, sinner: number}
  | {type: "remove"; sinner: number}

type TeamDispatcher = (member: TeamMember) => void

export function TeamReducer() : [TeamMember[], TeamDispatcher, TeamDispatcher] {
  const [team, dispatchTeam] = useReducer(teamReducer, []);

  function addMember(member: TeamMember) {
    dispatchTeam({
      type: 'add',
      payload: member,
      sinner: member.id.sinner
    });
  }

  function removeMember(member: TeamMember) {
    dispatchTeam({
      type: 'remove',
      sinner: member.id.sinner,
    });
  }

  return [team, addMember, removeMember];
}

function teamReducer(team: TeamMember[], action: TeamEditAction) {
  switch(action.type) {
    case "add": {
      return [...team, action.payload];
    }
    case "remove": {
      return team.filter((member) => member.id.sinner !== action.sinner)
    }
  }
}