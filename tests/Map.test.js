import test from 'ava';
import { stub } from 'sinon';
import {touchEventToContainerPoint} from '../src/helpers/Map';


test('It should calculate correct point', async (t) => {

	const containerMock = {clientLeft: 10, clientTop: 20, getBoundingClientRect: stub()};
	containerMock.getBoundingClientRect.returns({x: 10, y: 20, width: 100, height: 100, top: 20, right: 110, bottom: 961, left: 10});

	const event = {touches: [{clientX: 25, clientY: 52, target: containerMock, identifier: 543543}]};

	const point = touchEventToContainerPoint(event, containerMock);

	t.is(point.x, 5);
	t.is(point.y, 12);
});
