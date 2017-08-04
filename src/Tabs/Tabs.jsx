import React, { Component } from "react";
import PropTypes from "prop-types";

import { Tab, Tabs as Container } from "material-ui/Tabs";

export default class Tabs extends Component {
    state = { indexCurrentTab: 0 };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.handleOnChangeTab = this.handleOnChangeTab.bind(this);
    }

    handleOnChangeTab = e => {
        this.setState({ indexCurrentTab: e });
    };

    buildTabs = () => {
        const { tabs = [] } = this.props;

        return tabs.map((tab, i) => {
            return <Tab key={`tab-tab-${i}`} label={tab.label} value={i} />;
        });
    };

    getBodyTab = () => {
        const { tabs } = this.props,
            { indexCurrentTab } = this.state;

        if (tabs.length > 0) {
            return tabs[indexCurrentTab].body;
        }

        return "";
    };

    render = () => {
        const { indexCurrentTab } = this.state,
            body = this.getBodyTab(),
            tabs = this.buildTabs();

        return (
            <div>
                <Container
                    onChange={this.handleOnChangeTab}
                    value={indexCurrentTab}
                    style={{
                        position: "fixed",
                        left: "0",
                        zIndex: "1100",
                        top: "64px",
                        width: "100%"
                    }}
                >
                    {tabs}
                </Container>

                <div style={{ position: "relative", marginTop: "64px" }}>
                    {body}
                </div>
            </div>
        );
    };
}

Tabs.propTypes = {
    tabs: PropTypes.array.isRequired
};
