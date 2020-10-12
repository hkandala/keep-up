import { Badge, Card, Divider, Link, Spinner, Text } from "@geist-ui/react";
import { MessageSquare } from "@geist-ui/react-icons";
import { useEffect, useState } from "react";

export default function FeedCard(props) {
  const [data, setItems] = useState({ items: [], isFetching: false });

  useEffect(() => {
    (async () => {
      try {
        setItems({ items: data.items, isFetching: true });
        const response = await fetch(props.url);
        const responseJson = await response.json();
        setItems({ items: responseJson, isFetching: false });
      } catch (e) {
        console.log(e);
        setItems({ items: data.users, isFetching: false });
      }
    })();
  }, []);

  let feedContent;

  if (data.isFetching) {
    feedContent = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spinner size="large" />
      </div>
    );
  } else {
    const itemCount = data.items.length;
    feedContent = data.items.map((item, index) => (
      <>
        <div style={{ display: "flex" }}>
          <div style={{ width: 60, textAlign: "center" }}>
            <Badge>{item.score}</Badge>
          </div>
          <div
            style={{
              width:
                item.alternativeUrl != undefined
                  ? "calc(100% - 100px)"
                  : "calc(100% - 60px)",
            }}
          >
            <Link href={item.url} underline target="_blank" title={item.title}>
              {item.title}
            </Link>
            {item.description != undefined && item.description != "" ? (
              <>
                <Divider y={0.5} />
                <Text small style={{ fontWeight: 300 }}>
                  {item.description}
                </Text>
              </>
            ) : (
              <></>
            )}
          </div>
          {item.alternativeUrl != undefined ? (
            <div style={{ width: 40, textAlign: "right" }}>
              <Link href={item.alternativeUrl} target="_blank">
                <MessageSquare />
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        {index + 1 < itemCount ? <Divider /> : <></>}
      </>
    ));
  }

  return (
    <Card
      shadow
      style={{
        fontFamily: "'Roboto Slab', serif",
      }}
    >
      <Card.Content>
        <Text h4 style={{ fontWeight: 700 }}>
          {props.title}
        </Text>
      </Card.Content>
      <Divider y={0} />
      <Card.Content
        style={{ height: 500, overflowX: "hidden", overflowY: "scroll" }}
      >
        {feedContent}
      </Card.Content>
    </Card>
  );
}
