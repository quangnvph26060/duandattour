<div className="flex flex-col ml-3">
<label htmlFor="destination" className="mr-2 text-[#2d4271] font-medium">
  Điểm đến :
</label>
<select

id="destination"

value={selectedDestination}
onChange={(e) => setSelectedDestination(e.target.value)}
>
</select>
</div>