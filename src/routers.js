import React from 'react';
import { IndexRoute, Route ,IndexRedirect} from 'react-router';
import App from './page/App';
import { URL_PATH } from './conf';

const Home  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/home/index').default);
    }, 'home');
};
const Trade  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/trade/index').default);
    }, 'trands');
};
const List  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/list/index').default);
    }, 'list');
};
const Track  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/track/index').default);
    }, 'track');
};
const Next  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/next/index').default);
    }, 'next');
};
const TrackList  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/track/tracklist/track').default);
    }, 'tracklist');
};
const TrackListTop  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/track/listtop/list').default);
    }, 'listtop');
};
const Account  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/account/index').default);
    }, 'account');
};
const Ranking  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/rankingList/index').default);
    }, 'rankingList');
};
const Rule  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/rule/rule').default);
    }, 'rule');
};
const HistoryList  = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./page/historyList/index').default);
    }, 'historyList');
};
// const isSessionLoaded = (globalState) => {
//     return globalState.session && globalState.session.loaded;
// }
const createRoutes = () => {
    const requireLogin = (nextState, replace, cb) => {
        let checkAuth = () => {
            // const { session: { user } } = store.getState();
            // if(!user) {
            //     replace('/v2/login');
            // }
            cb();
        }
        checkAuth();
    };
    return (
        <Route path={URL_PATH} component={App}>
            <IndexRoute getComponent={Home} />
            <Route path="list"   getComponent={List} />
            <Route path="track"   getComponent={Track} >
                <IndexRedirect to="tracklist" />
                <Route path="tracklist" getComponent={TrackList} />
                <Route path="list" getComponent={TrackListTop} />    
            </Route>
            <Route path="account"   getComponent={Account} />
            <Route path="rankingList"   getComponent={Ranking} />
            <Route path="next"   getComponent={Next} />
            <Route path="trade" getComponent={Trade} ></Route>
            <Route path="rule"   getComponent={Rule} />
            <Route path="historyList"   getComponent={HistoryList} />
        </Route>
    )
};

export default createRoutes;