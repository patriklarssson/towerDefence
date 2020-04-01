


export default (currentPos, targetPos, vel) => {
	if (currentPos < targetPos) {
		let next = currentPos + vel
		if (next > targetPos)
			next = targetPos

		return next
	}
	else if (currentPos > targetPos) {
		let next = currentPos - vel
		if (next < targetPos)
			next = targetPos
		return next
	}
	else {
		return undefined
	}
}

const getpos = (currentPos, targetPos, vel) => {
	let remainingVel = 0
	if (currentPos < targetPos) {
		let next = currentPos + vel
		if (next > targetPos) {
			remainingVel = next - targetPos
			next = targetPos
		}

		return { next, remainingVel }
	}
	else if (currentPos > targetPos) {
		let next = currentPos - vel
		if (next < targetPos) {
			remainingVel = targetPos - next
			next = targetPos
		}
		return { next, remainingVel }
	}
	else {
		return { next: targetPos, remainingVel, done: true }
	}
}

export const goToNextPos = (current, nextPositions: number[], vel) => {
	let next = getpos(current, nextPositions[0], vel)
	if (next.done)
		return { pos: next.next, posReached: 1 }


	let i = 1
	while (next != undefined && next.remainingVel > 0) {
		next = getpos(next.next, nextPositions[i], next.remainingVel)
		i++
	}

	return { pos: next.next, posReached: (i - 1) }
}


export const velToPos = (start, target) => (current, vel) => {
	if (start < target)
		current += vel
	else if (start > target)
		current -= vel
	return current
}