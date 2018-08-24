import * as React from 'react';
import { IAssignment } from 'core/models';
import { tasksTemplates } from './tasksTemplates';
import { classNames } from 'core/styles';
const cn = classNames(require('./index.scss'));
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    CardText,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';

type Props = {
    assign: () => void;
    data: IAssignment[];
};

class Tasks extends React.PureComponent<Props> {
    hasData() {
        return Array.isArray(this.props.data) && this.props.data.length > 0;
    }

    render() {
        return (
            <div>
                <h2>Tasks</h2>
                <div className="row">
                    <div className="col-6">
                        <p>
                            Your github private repository{' '}
                            <a className="badge badge-dark" href="#">
                                here
                            </a>
                        </p>
                    </div>
                    <div className="col-6 text-right">
                        <p>You are in the TOP X students!</p>
                        <p>Full Score: X</p>
                    </div>
                </div>

                {this.hasData() ? (
                    this.props.data.map((feedRecord, i) => {
                        const template = tasksTemplates[feedRecord.taskId][feedRecord.status];
                        return (
                            <div key={i}>
                                <div>
                                    {template ? (
                                        template(feedRecord)
                                    ) : (
                                        <div>
                                            <Card className={cn('card-empty')}>
                                                <CardHeader>Not submitted yet!</CardHeader>
                                                <CardBody>
                                                    <CardTitle className={cn('card-empty-title')}>
                                                        {this.props.data[i].taskId}
                                                    </CardTitle>
                                                    <CardText>{this.props.data[i].assignmentRepo}</CardText>
                                                </CardBody>
                                                <CardFooter>
                                                    <small className={cn('text-muted')}>
                                                        <Form>
                                                            <FormGroup>
                                                                <Label for="taskUrl">Choose repo</Label>
                                                                <Input
                                                                    type="url"
                                                                    name="url"
                                                                    id="taskUrl"
                                                                    placeholder="Enter link"
                                                                    bsSize="sm"
                                                                    required={true}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="taskText">Comments</Label>
                                                                <Input
                                                                    type="textarea"
                                                                    name="text"
                                                                    id="taskText"
                                                                    rows="5"
                                                                    placeholder="Write comments here"
                                                                    bsSize="sm"
                                                                />
                                                            </FormGroup>
                                                            <Button
                                                                onClick={this.props.assign}
                                                                className={cn('submit-btn')}
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    </small>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Nothing to show</div>
                )}
            </div>
        );
    }
}

export default Tasks;