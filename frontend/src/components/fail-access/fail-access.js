import React from "react";
import { Grid, Message, Segment } from "semantic-ui-react";

function FailAccess() {
    return (
        <Grid.Row>
            <Grid.Column width={16}>
                <Segment>
                    <Message negative>
                        <Message.Header>
                            Trang bạn truy cập không tồn tại hoặc bạn không có quyền hạn truy cập chúng.
                        </Message.Header>
                    </Message>
                </Segment>
            </Grid.Column>
        </Grid.Row>
    );
}

export default FailAccess;
