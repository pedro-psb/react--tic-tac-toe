import { render, screen } from "@testing-library/react";
import { MessagesDisplay } from "./Messages.js";

describe("MessagesDisplay", () => {
  it("no messages shouldn't render anything", () => {
    render(<MessagesDisplay />);
    expect(screen.queryByText(/test/i)).toBeNull();
  });

  it("one message should render ok", () => {
    const messages = [{ type: "test", content: "this is a message" }];
    render(<MessagesDisplay messages={messages} />);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("lifo ordering display (display end of list first)", () => {
    const messages = [
      { type: "test", content: "message 1" },
      { type: "test", content: "message 2" },
      { type: "test", content: "message 3" },
    ];
    render(<MessagesDisplay messages={messages} />);
    const all_msg = screen.getAllByText(/message \d/i);
    expect(all_msg[0]).toHaveTextContent("message 3");
    expect(all_msg[1]).toHaveTextContent("message 2");
    expect(all_msg[2]).toHaveTextContent("message 1");
  });

  it("limiting the number of messages works", () => {
    const messages = [
      { type: "test", content: "message 1" },
      { type: "test", content: "message 2" },
      { type: "test", content: "message 3" },
      { type: "test", content: "message 4" },
    ];
    render(<MessagesDisplay messages={messages} limit={3} />);
    const all_msg = screen.getAllByText(/message \d/i);
    expect(all_msg).toHaveLength(3);
  });

  it("squashing two identical subsequent messages once", () => {
    const messages = [
      { type: "test", content: "message" },
      { type: "test", content: "message" },
    ];
    render(<MessagesDisplay messages={messages} />);
    expect(screen.getByText(/message \(2\)/i)).toBeInTheDocument();
  });

  it("squashing two identical subsequent messages twice", () => {
    const messages = [
      { type: "test", content: "message" },
      { type: "test", content: "message" },
      { type: "test", content: "message a" },
      { type: "test", content: "message b" },
      { type: "test", content: "message b" },
    ];
    render(<MessagesDisplay messages={messages} />);
    expect(screen.getByText(/message \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/message b \(2\)/i)).toBeInTheDocument();
  });

  it("squashing three identical subsequent messages once", () => {
    const messages = [
      { type: "test", content: "message" },
      { type: "test", content: "message" },
      { type: "test", content: "message" },
    ];
    render(<MessagesDisplay messages={messages} />);
    expect(screen.getByText(/message \(3\)/i)).toBeInTheDocument();
  });
});
