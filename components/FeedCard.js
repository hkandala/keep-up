import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import ClampLines from "react-clamp-lines";
import {
  Badge,
  Card,
  Divider,
  Link,
  Select,
  Spinner,
  Text,
} from "@geist-ui/react";
import { MessageSquare } from "@geist-ui/react-icons";

export default function FeedCard(props) {
  const defaultType = 0;
  const [items, setItems] = useState({ feedItems: [], isFetching: false });

  const fetchItems = async (type) => {
    try {
      setItems({ feedItems: [], isFetching: true });
      const response = await fetch(props.endpoints[Number(type)].url);
      const responseJson = await response.json();
      setItems({ feedItems: responseJson, isFetching: false });
    } catch (e) {
      console.error(e);
      setItems({ feedItems: [], isFetching: false });
    }
  };

  useEffect(() => {
    fetchItems(defaultType);
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
                <ClampLines text={item.description} className="description" />
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
        <Select
          initialValue={defaultType.toString()}
          size="small"
          onChange={fetchItems}
          disableMatchWidth
        >
          {props.endpoints.map((endpoint, index) => (
            <Select.Option value={index.toString()} key={index}>
              {endpoint.type}
            </Select.Option>
          ))}
        </Select>
      </Card.Content>
      <Divider y={0} />
      <SimpleBar className="list-wrapper">
        <Card.Content>{feedContent}</Card.Content>
      </SimpleBar>
    </Card>
  );
}
