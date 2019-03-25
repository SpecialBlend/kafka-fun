# kafka-pipe

A functional/fluent utility for kafka, built on top of `kafka-node`.

## Install

```
npm install @specialblend/kafka-pipe
```

## Classes

<dl>
<dt><a href="#PipeConsumer">PipeConsumer</a></dt>
<dd><p>Callable kafka Consumer with pipe and error helper methods</p>
</dd>
<dt><a href="#PipeProducer">PipeProducer</a></dt>
<dd><p>Callable kafka Producer
when instance is called directly, acts like PipeProducer.send</p>
</dd>
<dt><a href="#PipeSender">PipeSender</a></dt>
<dd><p>Callable kafka PipeProducer which allows presetting a destination topic and options</p>
</dd>
<dt><a href="#PipeTransformer">PipeTransformer</a></dt>
<dd><p>Consumer/producer mixin
pipes messages from <code>sourceTopic</code>
into <code>transformer</code> function
and sends result to <code>destinationTopic</code>
or <code>deadLetterTopic</code> on error</p>
</dd>
<dt><a href="#Client">Client</a></dt>
<dd><p>Kafka Client</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#createConsumer">createConsumer</a> ⇒ <code><a href="#PipeConsumer">PipeConsumer</a></code></dt>
<dd><p>Curried factory of PipeConsumer</p>
</dd>
<dt><a href="#createProducer">createProducer</a> ⇒ <code><a href="#PipeProducer">PipeProducer</a></code></dt>
<dd><p>Curried factory of PipeProducer</p>
</dd>
<dt><a href="#createSender">createSender</a> ⇒ <code><a href="#PipeSender">PipeSender</a></code></dt>
<dd><p>Curried factory of PipeProducer</p>
</dd>
<dt><a href="#createTransformer">createTransformer</a> ⇒ <code><a href="#PipeTransformer">PipeTransformer</a></code></dt>
<dd><p>Curried factory of PipeTransformer</p>
</dd>
</dl>

<a name="PipeConsumer"></a>

## PipeConsumer
Callable kafka Consumer with pipe and error helper methods

**Kind**: global class  

* [PipeConsumer](#PipeConsumer)
    * [.pipe(handler)](#PipeConsumer+pipe) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
    * [.error(handler)](#PipeConsumer+error) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
    * [.__call__(handler)](#PipeConsumer+__call__) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)

<a name="PipeConsumer+pipe"></a>

### pipeConsumer.pipe(handler) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
Pipe incoming messages to provided handler

**Kind**: instance method of [<code>PipeConsumer</code>](#PipeConsumer)  
**Returns**: [<code>PipeConsumer</code>](#PipeConsumer) - self  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | message handler function |

<a name="PipeConsumer+error"></a>

### pipeConsumer.error(handler) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
Alias for this.on('error')

**Kind**: instance method of [<code>PipeConsumer</code>](#PipeConsumer)  
**Returns**: [<code>PipeConsumer</code>](#PipeConsumer) - self  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | error handler function |

<a name="PipeConsumer+__call__"></a>

### pipeConsumer.\_\_call\_\_(handler) ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
Make instance callable alias of `this.pipe`

**Kind**: instance method of [<code>PipeConsumer</code>](#PipeConsumer)  
**Returns**: [<code>PipeConsumer</code>](#PipeConsumer) - self  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | message handler function |

<a name="PipeProducer"></a>

## PipeProducer
Callable kafka Producer
when instance is called directly, acts like PipeProducer.send

**Kind**: global class  

* [PipeProducer](#PipeProducer)
    * [new PipeProducer(client, options)](#new_PipeProducer_new)
    * [.send(payload)](#PipeProducer+send) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.__call__(payload)](#PipeProducer+__call__) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="new_PipeProducer_new"></a>

### new PipeProducer(client, options)
Create


| Param | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#Client) | kafka client |
| options | <code>Object</code> | opyions |

<a name="PipeProducer+send"></a>

### pipeProducer.send(payload) ⇒ <code>Promise.&lt;\*&gt;</code>
Send a payload

**Kind**: instance method of [<code>PipeProducer</code>](#PipeProducer)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Array.&lt;String&gt;</code> | payload |

<a name="PipeProducer+__call__"></a>

### pipeProducer.\_\_call\_\_(payload) ⇒ <code>Promise.&lt;\*&gt;</code>
Make instance callable alias of `this.send`

**Kind**: instance method of [<code>PipeProducer</code>](#PipeProducer)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Array.&lt;String&gt;</code> | payload |

<a name="PipeSender"></a>

## PipeSender
Callable kafka PipeProducer which allows presetting a destination topic and options

**Kind**: global class  

* [PipeSender](#PipeSender)
    * [new PipeSender(client, topic, payloadOptions, producerOptions)](#new_PipeSender_new)
    * [.send(messages)](#PipeSender+send) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="new_PipeSender_new"></a>

### new PipeSender(client, topic, payloadOptions, producerOptions)
Curry topic and payload options


| Param | Type | Description |
| --- | --- | --- |
| client | [<code>Client</code>](#Client) | kafka client |
| topic | <code>String</code> | kafka topic name |
| payloadOptions | <code>Object</code> | options to include with outgoing payloads |
| producerOptions | <code>Object</code> | producer options |

<a name="PipeSender+send"></a>

### pipeSender.send(messages) ⇒ <code>Promise.&lt;\*&gt;</code>
Send messages to preset topic, with preset options

**Kind**: instance method of [<code>PipeSender</code>](#PipeSender)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - returned Promise  

| Param | Type | Description |
| --- | --- | --- |
| messages | <code>Array.&lt;String&gt;</code> | an array of messages to send |

<a name="PipeTransformer"></a>

## PipeTransformer
Consumer/producer mixin
pipes messages from `sourceTopic`
into `transformer` function
and sends result to `destinationTopic`
or `deadLetterTopic` on error

**Kind**: global class  
<a name="new_PipeTransformer_new"></a>

### new PipeTransformer(transformer, client, sourceTopic, destinationTopic, deadLetterTopic)
create a PipeTransformer


| Param | Type | Description |
| --- | --- | --- |
| transformer | <code>function</code> | the transformer function |
| client | [<code>Client</code>](#Client) | kafka Client |
| sourceTopic | <code>String</code> | name of topic to read from |
| destinationTopic | <code>String</code> | name of topic to send to |
| deadLetterTopic | <code>String</code> | name of topic to send failed payloads |

<a name="Client"></a>

## Client
Kafka Client

**Kind**: global class  
<a name="new_Client_new"></a>

### new Client(kafkaHost, options)
Create a kafka Client


| Param | Type | Description |
| --- | --- | --- |
| kafkaHost | <code>String</code> | kafka host |
| options | <code>Object</code> | options |

<a name="createConsumer"></a>

## createConsumer ⇒ [<code>PipeConsumer</code>](#PipeConsumer)
Curried factory of PipeConsumer

**Kind**: global constant  
<a name="createProducer"></a>

## createProducer ⇒ [<code>PipeProducer</code>](#PipeProducer)
Curried factory of PipeProducer

**Kind**: global constant  
<a name="createSender"></a>

## createSender ⇒ [<code>PipeSender</code>](#PipeSender)
Curried factory of PipeProducer

**Kind**: global constant  
<a name="createTransformer"></a>

## createTransformer ⇒ [<code>PipeTransformer</code>](#PipeTransformer)
Curried factory of PipeTransformer

**Kind**: global constant  
