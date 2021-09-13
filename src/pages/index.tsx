import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { TypingGame } from "./typingGame";
import { QuestionForm } from "./questionForm";

export default function Pages() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <TypingGame />
        </Route>
        <Route path="/form">
          <QuestionForm />
        </Route>
      </div>
    </Router>
  );
}
