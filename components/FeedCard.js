import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { Badge, Card, Divider, Link, Spinner, Text } from "@geist-ui/react";
import { MessageSquare } from "@geist-ui/react-icons";
import { RefreshCcw } from "@geist-ui/react-icons";

export default function FeedCard(props) {
  const [items, setItems] = useState({ feedItems: [], isFetching: false });

  const fetchItems = async () => {
    try {
      setItems({ feedItems: [], isFetching: true });
      const response = await fetch(props.url);
      const responseJson = await response.json();
      setItems({ feedItems: responseJson, isFetching: false });
    } catch (e) {
      console.log(e);
      setItems({ feedItems: [], isFetching: false });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  let feedContent;
  const itemCount = items.feedItems.length;

  if (items.isFetching) {
    feedContent = (
      <div className="spinner-wrapper center">
        <Spinner size="large" />
      </div>
    );
  } else if (items.feedItems.length == 0) {
    feedContent = (
      <div className="error-wrapper center">
        <Text b>Uh oh, something wrong happened :(</Text>
      </div>
    );
  } else {
    feedContent = items.feedItems.map((item, index) => (
      <React.Fragment key={index}>
        <div className="list-item">
          <div className="badge-wrapper">
            <Badge size="small">{item.score}</Badge>
          </div>
          <div
            className={
              item.alternativeUrl != undefined
                ? "link-content-with-discussion"
                : "link-content"
            }
          >
            <Link href={item.url} underline title={item.title} target="_blank">
              <Text small>{item.title}</Text>
            </Link>
            {item.description != undefined && item.description != "" ? (
              <>
                <Divider y={0.5} />
                <Text small className="description">
                  {item.description}
                </Text>
              </>
            ) : (
              <></>
            )}
          </div>
          {item.alternativeUrl != undefined ? (
            <div className="discussion-link-wrapper">
              <Link href={item.alternativeUrl} target="_blank">
                <MessageSquare size={20} />
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        {index + 1 < itemCount ? <Divider y={1.5} /> : <></>}
      </React.Fragment>
    ));
  }

  return (
    <Card shadow className="card">
      <Card.Content className="feed-header-wrapper">
        <Text h4>{props.title}</Text>
        <div onClick={async () => await fetchItems()} className="feed-refresh">
          <RefreshCcw size={16} />
        </div>
      </Card.Content>
      <Divider y={0} />
      <SimpleBar className="list-wrapper">
        <Card.Content>{feedContent}</Card.Content>
      </SimpleBar>
    </Card>
  );
}
