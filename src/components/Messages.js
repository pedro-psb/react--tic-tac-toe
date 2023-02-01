export function MessagesDisplay({ messages = [], limit = 5 }) {
  function limit_messages_number(msgs, limit) {
    const msg_len = msgs.length;
    return msg_len > limit ? msgs.slice(msg_len - limit, msg_len) : msgs;
  }

  function squash_identical(msgs) {
    let new_arr = [];
    let counter = 0;
    for (const i in msgs) {
      const current = msgs[i];
      const last = i > 0 ? msgs[i - 1] : null;
      if (
        last &&
        last.type === current.type &&
        last.content === current.content
      ) {
        counter += 1;
        new_arr[new_arr.length - 1].count = counter + 1;
      } else {
        counter = 0;
        new_arr.push({ ...msgs[i], count: counter + 1 });
      }
    }
    return new_arr;
  }

  if (messages.length) {
    const squashed = squash_identical(messages);
    const limited = limit_messages_number(squashed, limit);
    const inverted = [...limited].reverse();
    return (
      <div id="messages" className="col">
        {inverted.map((msg, i) => (
          <p key={i}>
            [{msg.type.toUpperCase()}] {msg.content}{" "}
            {msg.count > 1 ? `(${msg.count})` : null}
          </p>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
