import { Component } from "react";
import css from "./deck-of-card.css";

async function createDeck() {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const deck = await response.json();
  return deck.deck_id;
}

async function getCards(deckId) {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`
  );
  return await response.json();
}

class DeckOfCards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  async componentDidMount() {
    const deckId = await createDeck();
    const data = await getCards(deckId);

    this.setState({
      cards: data.cards,
    });
  }

  render() {
    return (
      <section>
        <h1>SORTEIO CARTAS</h1>
        <p>
          <b>Atualize a pagina para novos sorteios de cartas.</b>
        </p>
        <ul>
          {this.state.cards.map((card, index) => {
            return (
              <li key={index}>
                <img src={card.image} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default DeckOfCards;
