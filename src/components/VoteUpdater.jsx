import React, { Component } from "react";
import * as api from "../api";

class VoteUpdater extends Component {
  state = { voteChange: 0 };

  handleClick(vote_inc) {
    const { id, type } = this.props;
    this.setState((currentState) => {
      return { voteChange: currentState.voteChange + vote_inc };
    });
    api.patchVotes(id, vote_inc, type).catch((err) => {
      console.log(err);
      //undoes changes made to state if unable to change vote
      this.setState((currentState) => {
        return { voteChange: currentState.voteChange - vote_inc };
      });
    });
  }

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    return (
      <section className="voter">
        <button
          disabled={voteChange === 1}
          onClick={() => {
            this.handleClick(1);
          }}
        >
          👏🏾
        </button>
        <p>Votes: {votes + voteChange}</p>
        <button
          disabled={voteChange === -1}
          onClick={() => {
            this.handleClick(-1);
          }}
        >
          👎🏾
        </button>
      </section>
    );
  }
}

export default VoteUpdater;
