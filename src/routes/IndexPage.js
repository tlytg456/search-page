import React from 'react';
import { connect } from 'dva';
import { Button, Col, Input, Row } from 'antd';
import styles from './IndexPage.less';

const Search = Input.Search;

const customStyles = {
  button: {
    marginTop: 16,
    marginLeft: 8,
    marginRigth: 8,
  }
}

function IndexPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
            <span className={styles.title}>Ant Design</span>
        </div>
        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={9} />
          <Col xs={20} sm={16} md={12} lg={8} xl={6}>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              size={'large'}
            />
            <Button
              size={'large'}
              icon={'search'}
              type={'primary'}
              style={customStyles.button}
            >
              百度
            </Button>
            <Button
              size={'large'}
              icon={'google'}
              type={'primary'}
              style={customStyles.button}
            >
              Google
            </Button>
            <Button
              size={'large'}
              icon={'taobao'}
              type={'primary'}
              style={customStyles.button}
            >
              淘宝
            </Button>
            <Button
              size={'large'}
              icon={'zhihu'}
              type={'primary'}
              style={customStyles.button}
            >
              知乎
            </Button>
            <Button
              size={'large'}
              icon={'zhihu'}
              type={'primary'}
              style={customStyles.button}
            >
              Bilibili
            </Button>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={9} />
        </Row>

      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
